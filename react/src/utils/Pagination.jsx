/* eslint-disable react/prop-types */
const Pagination = ({ meta, onPageChange, links }) => {
  const current_page = meta.current_page;
  const last_page = meta.last_page;

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Nombre maximum de numéros de page affichés

    // Logique pour déterminer les numéros de page à afficher
    let startPage = Math.max(current_page - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;
    if (endPage > last_page) {
      endPage = last_page;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === current_page ? 'active' : ''}`}
        >
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };
  
  return (
    <div className="pagination-container">
      <ul className="pagination">
        {links.first && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(1)}
              disabled={current_page === 1}
            >
              Première
            </button>
          </li>
        )}
        {links.prev && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(current_page - 1)}
              disabled={current_page === 1}
            >
              Précédente
            </button>
          </li>
        )}
        {renderPageNumbers()}
        {links.next && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(current_page + 1)}
              disabled={current_page === last_page}
            >
              Suivante
            </button>
          </li>
        )}
        {links.last && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(last_page)}
              disabled={current_page === last_page}
            >
              Dernière
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
