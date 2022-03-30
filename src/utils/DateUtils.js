function DateUtils() {}

DateUtils.formatDateResponse = function(resDate) {
  if (typeof resDate !== "string") return resDate;

  var dateTime = resDate.split(" ");
  var date = dateTime[0].replace(/-/g, "");
  var time;
  if (dateTime[1]) {
    time = dateTime[1].replace(/:/g, "");
  } else {
    time = "";
  }

  return date + time;
};

DateUtils.getPeriods = function() {
  var current = new Date(),
    y = current.getFullYear(),
    m = current.getMonth();
  var startOfMonth = new Date(y, m, 1);
  var startOfYear = new Date(y, 0, 1);
  var lastSevenDays = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  var lastSixMonths = DateUtils.addMonths(new Date(startOfMonth), -6);

  new Date(startOfMonth - 180 * 24 * 60 * 60 * 1000);

  return {
    startOfMonth: startOfMonth.toISOString().split("T")[0],
    startOfYear: startOfYear.toISOString().split("T")[0],
    lastSevenDays: lastSevenDays.toISOString().split("T")[0],
    lastSixMonths: lastSixMonths.toISOString().split("T")[0],
  };
};

DateUtils.addMonths = function(input, months) {
  const date = new Date(input);
  date.setDate(1);
  date.setMonth(date.getMonth() + months);
  date.setDate(
    Math.min(
      input.getDate(),
      DateUtils.getDaysInMonth(date.getFullYear(), date.getMonth() + 1)
    )
  );
  return date;
};

DateUtils.getDaysInMonth = function(year, month) {
  return new Date(year, month, 0).getDate();
};
