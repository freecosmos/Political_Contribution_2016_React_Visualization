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

export function sourceData(data) {
  return data.map(row => {
    // return a formatted object to manipulate
    return {
      姓名: row.姓名,
      個人捐贈收入: row.個人捐贈收入,
      營利事業捐贈收入: row.營利事業捐贈收入,
      政黨捐贈收入: row.政黨捐贈收入,
      人民團體捐贈收入: row.人民團體捐贈收入,
      匿名捐贈收入: row.匿名捐贈收入,
      其他收入: row.其他收入
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

