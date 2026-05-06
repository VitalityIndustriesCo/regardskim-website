import { redirect } from "next/navigation";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";

export default function SignupPage() {
  redirect(SHOPIFY_APP_STORE_INSTALL_URL);
}
