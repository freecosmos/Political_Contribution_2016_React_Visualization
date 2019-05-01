export function barChartData(data) {
  return data.map(row => {
    // return a formatted object to manipulate
    return {
      姓名: row.姓名,
      總收入: row.總收入,
      捐贈企業數: row. 捐贈企業數
    };
  });
}

export function multiSelectData(data) {
  return data.map(row => {
    // return a formatted object to manipulate
    return {
      value: row.姓名,
      label: row.姓名
    };
  });
}

