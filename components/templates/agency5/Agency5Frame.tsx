import StaticAgencyFrame from "../agencies/StaticAgencyFrame";

type Agency5FrameProps = {
  page: string;
  title: string;
};

export default function Agency5Frame({ page, title }: Agency5FrameProps) {
  return <StaticAgencyFrame agencyNumber={5} page={page} title={title} />;
}
