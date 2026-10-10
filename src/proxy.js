import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from './lib/auth'
 
export async function proxy(request) {
    
const session = await auth.api.getSession({
    headers: await headers()

})
const user = session?.user
if(!user){
      return NextResponse.redirect(new URL('/signIn', request.url))

}
console.log(session)
}
 
export const config = {
  matcher: ['/profile'],
}