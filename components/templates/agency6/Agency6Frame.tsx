import StaticAgencyFrame from "../agencies/StaticAgencyFrame";

type Agency6FrameProps = {
  page: string;
  title: string;
};

export default function Agency6Frame({ page, title }: Agency6FrameProps) {
  return <StaticAgencyFrame agencyNumber={6} page={page} title={title} />;
}
