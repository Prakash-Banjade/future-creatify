import { redirect, RedirectType } from "next/navigation";

export default function CMSPage() {
  return redirect('/cms/dashboard', RedirectType.replace);
}