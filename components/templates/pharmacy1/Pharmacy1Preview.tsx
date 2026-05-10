import Pharmacy1Frame from "./Pharmacy1Frame";

type Pharmacy1PreviewProps = {
  page: string;
  title: string;
};

export default function Pharmacy1Preview({ page, title }: Pharmacy1PreviewProps) {
  return <Pharmacy1Frame page={page} title={title} />;
}
