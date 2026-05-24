export function SectionHeader({ boldTitle, lightTitle }) {
  return (
    <div className="section_head">
      <div className="bold_title">
        <h2>{boldTitle}</h2>
      </div>
      <div className="light_title">
        <h3>{lightTitle}</h3>
      </div>
    </div>
  );
}
