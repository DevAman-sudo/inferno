(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[270],{8744:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/signup/verify",function(){return n(8769)}])},8769:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var i=n(5893),r=n(7294),s=n(1163),u=n(1955),a=n(6154);function o(){let e=(0,s.useRouter)(),[t,n]=(0,r.useState)("Verifying email...");return(0,r.useEffect)(()=>{let t=async()=>{let t=e.query.token;if(!t){n("Invalid token.");return}n("Please wait...");let i=u.Z.get("user_name"),r=u.Z.get("user_email"),s=u.Z.get("user_key"),o=u.Z.get("verification_token");if(t===o)try{let t=await a.Z.post("/api/users/createuser",{userName:i,userEmail:r,userKey:s});n(t.data.message),u.Z.remove("user_key"),u.Z.remove("verification_token"),e.push("/login?message=registration successful")}catch(e){console.log(e),n("An error occurred while verifying email.")}else n("Token not valid.")};t()},[e.query.token]),(0,i.jsxs)("div",{className:"w-full h-auto p-8 flex flex-col justify-center items-center tracking-widest text-3xl",children:[(0,i.jsx)("h1",{children:"Email Verification"}),(0,i.jsxs)("p",{children:[t," ... "]})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8744)}),_N_E=e.O()}]);