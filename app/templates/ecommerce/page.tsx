import TemplatePreviewBar from "@/components/templates/shared/TemplatePreviewBar";
import EcommerceFullTemplate from "@/components/templates/ecommerce/full/EcommerceFullTemplate";

export default function EcommerceTemplatePreviewPage() {
  return (
    <main>
      <TemplatePreviewBar
        title="Shata Store Ecommerce Template"
        subtitle="A live preview of a premium ecommerce store built on Shata Platform."
        startHref="/contact?type=website-platform&template=ecommerce"
        backHref="/services/website-platform/industries/ecommerce"
      />
      <EcommerceFullTemplate />
    </main>
  );
}
