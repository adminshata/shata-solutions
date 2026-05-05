import EcommerceEditor from "@/components/templates/ecommerce/EcommerceEditor";
import { ecommerceTemplateData } from "@/lib/templates/ecommerce";

export default function EcommerceTemplateEditorPage() {
  return <EcommerceEditor initialData={ecommerceTemplateData} />;
}
