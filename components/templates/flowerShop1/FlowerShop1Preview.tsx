import FlowerShop1Frame from "./FlowerShop1Frame";

type FlowerShop1PreviewProps = {
  page: string;
  title: string;
};

export default function FlowerShop1Preview({ page, title }: FlowerShop1PreviewProps) {
  return <FlowerShop1Frame page={page} title={title} />;
}
