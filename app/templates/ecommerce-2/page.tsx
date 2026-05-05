import TemplatePreviewBar from "@/components/templates/shared/TemplatePreviewBar";
import EcommerceFullTemplate2 from "@/components/templates/ecommerce-2/full/EcommerceFullTemplate2";

export default function EcommerceTemplate2PreviewPage() {
  return (
    <main>
      <TemplatePreviewBar
        title="Shata Home — Furniture & Decor Template"
        subtitle="A live preview of a bold home decor store built on Shata Platform."
        startHref="/contact?type=website-platform&template=ecommerce-2"
        backHref="/services/website-platform/industries/ecommerce"
      />
      <EcommerceFullTemplate2 />
    </main>
  );
}
