import StaticAgencyFrame from "../agencies/StaticAgencyFrame";

type Agency4FrameProps = {
  page: string;
  title: string;
};

export default function Agency4Frame({ page, title }: Agency4FrameProps) {
  return <StaticAgencyFrame agencyNumber={4} page={page} title={title} />;
}
