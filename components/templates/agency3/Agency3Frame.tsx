import StaticAgencyFrame from "../agencies/StaticAgencyFrame";

type Agency3FrameProps = {
  page: string;
  title: string;
};

export default function Agency3Frame({ page, title }: Agency3FrameProps) {
  return <StaticAgencyFrame agencyNumber={3} page={page} title={title} />;
}
