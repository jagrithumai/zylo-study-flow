
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper function to convert ArrayBuffer to base64url
function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Helper function to convert string to base64url
function stringToBase64Url(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { room_id, user_id, role } = await req.json()

    const HMS_APP_ACCESS_KEY = Deno.env.get('HMS_APP_ACCESS_KEY')
    const HMS_APP_SECRET = Deno.env.get('HMS_APP_SECRET')

    if (!HMS_APP_ACCESS_KEY || !HMS_APP_SECRET) {
      throw new Error('HMS credentials not found')
    }

    const now = Math.floor(Date.now() / 1000)
    
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    }

    const payload = {
      access_key: HMS_APP_ACCESS_KEY,
      room_id: room_id,
      user_id: user_id,
      role: role,
      type: 'app',
      version: 2,
      iat: now,
      nbf: now
    }

    console.log('Creating token with payload:', payload)

    // Create JWT token
    const headerEncoded = stringToBase64Url(JSON.stringify(header))
    const payloadEncoded = stringToBase64Url(JSON.stringify(payload))
    
    const message = `${headerEncoded}.${payloadEncoded}`
    
    // Create the signing key
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(HMS_APP_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    // Sign the message
    const signature = await crypto.subtle.sign(
      'HMAC', 
      key, 
      new TextEncoder().encode(message)
    )
    
    const signatureEncoded = arrayBufferToBase64Url(signature)

    const token = `${message}.${signatureEncoded}`

    console.log('Token created successfully')

    return new Response(
      JSON.stringify({ token }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error creating HMS token:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
