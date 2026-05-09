import StaticAgencyFrame from "../agencies/StaticAgencyFrame";

type Agency8FrameProps = {
  page: string;
  title: string;
};

export default function Agency8Frame({ page, title }: Agency8FrameProps) {
  return <StaticAgencyFrame agencyNumber={8} page={page} title={title} />;
}
