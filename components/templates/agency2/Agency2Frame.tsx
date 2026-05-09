import StaticAgencyFrame from "../agencies/StaticAgencyFrame";

type Agency2FrameProps = {
  page: string;
  title: string;
};

export default function Agency2Frame({ page, title }: Agency2FrameProps) {
  return <StaticAgencyFrame agencyNumber={2} page={page} title={title} />;
}
