const getStartAndEndOfWeek = (date) => {
    if (!date) {
      date = new Date();
    }
  
    // Oblicz datę początku aktualnego tygodnia
    const currentDayOfWeek = date.getDay();
    const daysUntilMonday = 1 - currentDayOfWeek;
    const startDate = new Date(date);
    startDate.setDate(date.getDate() + daysUntilMonday);
  
    // Oblicz datę początku poprzedniego tygodnia (odejmujemy 7 dni)
    const weekStartDate = new Date(startDate);
    weekStartDate.setDate(startDate.getDate() - 7);
  
    // Oblicz datę końca poprzedniego tygodnia (6 dni przed początkiem aktualnego tygodnia)
    const weekEndDate = new Date(startDate);
    weekEndDate.setDate(startDate.getDate() - 1);
  
    return {
      startOfWeek: weekStartDate,
      endOfWeek: weekEndDate,
    };
  }

export default getStartAndEndOfWeek;