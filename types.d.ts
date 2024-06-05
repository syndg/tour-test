type ValidSAPayload = {
  status: "success" | "error";
  message?: string;
  data?: any;
};

type AuthProvider =
  | "apple"
  | "azure"
  | "bitbucket"
  | "discord"
  | "facebook"
  | "github"
  | "gitlab"
  | "google"
  | "keycloak"
  | "linkedin"
  | "notion"
  | "slack"
  | "spotify"
  | "twitch"
  | "twitter"
  | "workos";
