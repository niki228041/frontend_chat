export default function parseJwt (token:any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function SetAccessToken(token:string)
{
  window.localStorage.setItem("accessToken",token);
}

export function GetAccessToken()
{
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
}


export function RemoveTokens()
{
  window.localStorage.removeItem("accessToken");
}