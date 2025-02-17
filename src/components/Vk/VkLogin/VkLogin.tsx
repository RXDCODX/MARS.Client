import * as VKID from "@vkid/sdk";

export default function VkLogin() {
  VKID.Config.init({
    app: 51932542,
    redirectUrl: "https://localhost:5137/redirectvkapi",
    state: "state",
    codeVerifier: "codeVerifier",
    scope: "email,wall,photos,video,docs,stories,groups,offline, messages",
  });

  return (
    <div>
      <button onClick={() => VKID.Auth.login().catch(console.error)}></button>
    </div>
  );
}
