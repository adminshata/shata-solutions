import StaticAgencyFrame from "../agencies/StaticAgencyFrame";

type Agency7FrameProps = {
  page: string;
  title: string;
};

export default function Agency7Frame({ page, title }: Agency7FrameProps) {
  return <StaticAgencyFrame agencyNumber={7} page={page} title={title} />;
}
