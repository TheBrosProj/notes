import Cookies from "js-cookie";

export const CookieConsent = (Cookies.get('cookies')!== "deny" && Cookies.get('cookies')==="allow" ) ? true : false;

export const setCookies = (name: string,data: any) => {
    if (CookieConsent) {
        Cookies.set(name, JSON.stringify(data));
    }
};

export function getCookies(name:string): string {
    if (CookieConsent) {
        const CookieNotes: string | undefined = Cookies.get(name);
        if (CookieNotes) {
            return CookieNotes;
        }else{
            return "[]";
        }
    }else{
        return "[]";
    }
};