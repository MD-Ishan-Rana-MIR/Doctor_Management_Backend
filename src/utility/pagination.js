const getPagination = (page = "1", limit = "10") => {
  const currentPage = Number(page);
  const pageSize = Number(limit);

  if (
    !Number.isInteger(currentPage) ||
    !Number.isInteger(pageSize) ||
    currentPage < 1 ||
    pageSize < 1 ||
    pageSize > 100
  ) {
    return {
      error: "Page must be >= 1 and limit must be between 1 and 100.",
    };
  }

  const skip = (currentPage - 1) * pageSize;

  return {
    currentPage,
    pageSize,
    skip,
  };
};

const getPaginationResponse = (total, currentPage, pageSize) => {
  return {
    total,
    page: currentPage,
    limit: pageSize,
    totalPages: Math.ceil(total / pageSize),
    hasNextPage: currentPage * pageSize < total,
    hasPrevPage: currentPage > 1,
  };
};

module.exports = {
  getPagination,
  getPaginationResponse,
};