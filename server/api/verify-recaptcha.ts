export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  const config = useRuntimeConfig()
  const secretKey = config.recaptchaSecretKey

  if (!secretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'reCAPTCHA secret key not configured'
    })
  }

  try {
    const body = await readBody(event)
    const { token } = body

    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'reCAPTCHA token is required'
      })
    }

    // Verify the token with Google's reCAPTCHA API
    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify'
    const response = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token
      })
    })

    const data = await response.json()

    if (!data.success) {
      return {
        success: false,
        error: 'reCAPTCHA verification failed',
        'error-codes': data['error-codes'] || []
      }
    }

    return {
      success: true,
      score: data.score || null,
      action: data.action || null
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to verify reCAPTCHA'
    })
  }
})

