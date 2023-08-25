(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{4167:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return t(3481)}])},3481:function(e,s,t){"use strict";t.r(s);var a=t(5893),l=t(7294),r=t(6154),i=t(1163),n=t.n(i),o=t(1955);let c=()=>{!async function(){let e=o.Z.get("token"),s=o.Z.get("user_id");if(e)try{let t=await fetch("/api/middleware/auth?token=".concat(e),{method:"POST"});t.ok&&n().push({pathname:"/profile/".concat(s)})}catch(e){n().push({pathname:"/login",query:{message:"Token Expired, Please LogIn"}})}}();let e=(0,i.useRouter)(),[s,t]=(0,l.useState)(""),[c,d]=(0,l.useState)(!1);(0,l.useEffect)(()=>{let s=e.query.message;s&&(t(s),d(!0));let a=setTimeout(()=>{d(!1)},3e3);return()=>{clearTimeout(a)}},[e.query.message]);let[m,x]=(0,l.useState)(""),[u,h]=(0,l.useState)(""),[f,p]=(0,l.useState)({}),[g,v]=(0,l.useState)(""),[w,j]=(0,l.useState)(!1),N=()=>{let e={};return m.trim()?/\S+@\S+\.\S+/.test(m)||(e.email="Email is invalid"):e.email="Email is required",u.trim()?u.length<6&&(e.password="Password should be at least 6 characters long"):e.password="Password is required",p(e),0===Object.keys(e).length},b=async e=>{if(e.preventDefault(),N()){j(!0);try{let e=await r.Z.post("/api/users/login",{email:m,password:u});"isAdminTrue"===e.data.message?(o.Z.set("isAdmin",!0),localStorage.setItem("token",e.data.token),n().push("/admin")):(o.Z.set("user_id",e.data.user._id,{expires:7,secure:!0}),o.Z.set("token",e.data.token,{expires:7,secure:!0}),o.Z.set("isAdmin",!1,{expires:7,secure:!0}),n().push("/profile/".concat(e.data.user._id)))}catch(e){j(!1),v(e.response.data.message)}}};return(0,a.jsxs)("div",{children:[c&&(0,a.jsx)("div",{className:"fixed top-0 left-0 lg:left-auto right-0 z-50 p-4",children:(0,a.jsxs)("div",{className:"mx-auto max-w-sm bg-white rounded-lg shadow-lg flex items-center",children:[(0,a.jsx)("div",{className:"flex-shrink-0",children:(0,a.jsx)("svg",{className:"h-8 w-8 text-gray-400",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M16 10a6 6 0 11-12 0 6 6 0 0112 0zm-6 5a1 1 0 100-2 1 1 0 000 2zm0-10a1 1 0 100-2 1 1 0 000 2zM5.78 14.55a4.002 4.002 0 01-1.513-1.513A5.984 5.984 0 013 10a6 6 0 1111.268 3H13a1 1 0 00-1 1v1a1 1 0 102 0v-1a3 3 0 00-3-3h-.268A5.992 5.992 0 015.78 14.55zM10 12a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"})})}),(0,a.jsx)("div",{className:"ml-4",children:(0,a.jsx)("div",{className:"mt-2 mx-2 text-sm text-gray-500",children:s})})]})}),(0,a.jsx)("div",{className:"md:min-h-screen flex flex-col md:items-center md:justify-center bg-milky",children:(0,a.jsxs)("div",{className:"flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md",children:[(0,a.jsx)("div",{className:"font-medium self-center text-xl sm:text-2xl uppercase text-gray-800",children:"Login To Your Account"}),(0,a.jsx)("div",{className:"mt-10",children:(0,a.jsxs)("form",{onSubmit:b,noValidate:!0,children:[(0,a.jsxs)("div",{className:"flex flex-col mb-6",children:[(0,a.jsx)("label",{htmlFor:"email",className:"mb-1 text-xs sm:text-sm tracking-wide text-gray-600",children:"E-Mail Address:"}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"inline-flex items-center justify-center left-0 top-0 h-full w-10 text-gray-400",children:(0,a.jsx)("svg",{className:"h-6 w-6",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{d:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"})})}),(0,a.jsxs)("div",{className:"flex flex-col w-full",children:[(0,a.jsx)("input",{className:"text-sm sm:text-base placeholder-gray-500 p-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400",type:"email",value:m,onChange:e=>x(e.target.value),placeholder:"Email",required:!0}),f.email&&(0,a.jsx)("span",{className:"text-sm text-rose-600 tracking-wider",children:f.email})]})]})]}),(0,a.jsxs)("div",{className:"flex flex-col mb-6",children:[(0,a.jsx)("label",{htmlFor:"password",className:"mb-1 text-xs sm:text-sm tracking-wide text-gray-600",children:"Password:"}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"inline-flex items-center justify-center left-0 top-0 h-full w-10 text-gray-400",children:(0,a.jsx)("span",{children:(0,a.jsx)("svg",{className:"h-6 w-6",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})})})}),(0,a.jsxs)("div",{className:"flex flex-col w-full",children:[(0,a.jsx)("input",{className:"text-sm sm:text-base placeholder-gray-500 p-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400",type:"password",value:u,onChange:e=>h(e.target.value),placeholder:"Password"}),f.password&&(0,a.jsx)("span",{className:"text-sm text-rose-600 tracking-wider",children:f.password})]})]})]}),(0,a.jsx)("div",{className:"flex items-center mb-6 -mt-4",children:(0,a.jsx)("div",{className:"flex ml-auto",children:(0,a.jsx)("a",{href:"/login/resetpassword",className:"inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700",children:"Forgot Your Password?"})})}),(0,a.jsx)("div",{className:"flex w-full",children:(0,a.jsx)("button",{type:"submit",className:"flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-themecolor rounded py-2 w-full transition duration-150 ease-in",children:w?(0,a.jsxs)("svg",{className:"animate-spin h-5 w-5 mr-3 tracking-widest",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,a.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,a.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16z"})]}):"LOGIN"})})]})}),(0,a.jsx)("div",{className:"flex justify-center items-center mt-6",children:(0,a.jsxs)("a",{href:"/signup",target:"_blank",className:"inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center",children:[(0,a.jsx)("span",{children:(0,a.jsx)("svg",{className:"h-6 w-6",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{d:"M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"})})}),(0,a.jsx)("span",{className:"ml-2",children:"You don't have an account?"})]})}),g&&(0,a.jsx)("div",{className:"error my-2",children:(0,a.jsxs)("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",role:"alert",children:[(0,a.jsx)("strong",{className:"font-bold",children:"Error: "}),(0,a.jsx)("span",{className:"block sm:inline",children:g})]})})]})})]})};s.default=c}},function(e){e.O(0,[774,888,179],function(){return e(e.s=4167)}),_N_E=e.O()}]);