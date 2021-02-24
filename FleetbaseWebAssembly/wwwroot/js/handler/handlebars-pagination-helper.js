Handlebars.registerHelper('pagination', function(currentPage, totalPages, size, pageSize, options) {
  var startPage, endPage, context;

  if (arguments.length === 4) {
    options = size;
    size = 10;
  }

  startPage = currentPage - Math.floor(size / 2);
  endPage = currentPage + Math.floor(size / 2);

  

  if (startPage <= 0) {
    endPage -= (startPage) - 1;
    startPage = 1;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    if (endPage - size + 1 > 0) {
      startPage = endPage - size + 1;
    } else {
      startPage = 1;
    }
  }


  context = {
    startFromFirstPage: false,
    pages: [],
    endAtLastPage: false,
    currentPage: currentPage,
    totalPages: totalPages,
    pageSize: pageSize,
    isOnFirstPage: currentPage == 1,
    isOnLastPage: currentPage == totalPages,
  };

  if (startPage === 1) {
      context.startFromFirstPage = true;
  }
  else 
  {
      // Two pages are taken up by the first page and a set of elipses
      for (var index = 0; index < 2; index++)
        if(startPage + 1 <= totalPages)
            startPage = startPage + 1;
  }

  if (endPage === totalPages) {
      context.endAtLastPage = true;
  }
  else {
      // Two pages are taken up by the last page and a set of elipses
      for (var index = 0; index < 2; index++)
          if (endPage - 1 >= 1)
              endPage = endPage - 1;
  }


  for (var i = startPage; i <= endPage; i++) {
    context.pages.push({
      page: i,
      isCurrent: i === currentPage,
    });
  }
  

  return options.fn(context);
});