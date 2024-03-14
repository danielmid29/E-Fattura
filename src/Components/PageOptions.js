const PageOptions = ({ totalPage, handlePageChange, pageNumber }) => {
  var options = [],
    i = 0,
    len = totalPage;
  while (++i <= len) options.push(i);
  return (
    <select
      className="page-drop-down"
      onChange={handlePageChange}
      value={pageNumber}
    >
      {options.map(function (i) {
        return (
          <option className="page-drop-down-options" value={i} key={i}>
            {i}
          </option>
        );
      })}
      {options}
    </select>
  );
};

export default PageOptions;
