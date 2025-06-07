
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const payload = {
      access_key: HMS_APP_ACCESS_KEY,
      room_id: room_id,
      user_id: user_id,
      role: role,
      type: 'app',
      version: 2,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000)
    }

    // Create JWT token
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payloadEncoded = btoa(JSON.stringify(payload))
    
    const message = `${header}.${payloadEncoded}`
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(HMS_APP_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
    const signatureEncoded = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')

    const token = `${message}.${signatureEncoded}`

    return new Response(
      JSON.stringify({ token }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
