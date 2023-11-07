const getStartAndEndOfWeek = (date) => {
    if (!date) {
        date = new Date();
    }

    // Oblicz datę początku aktualnego tygodnia
    const currentDayOfWeek = date.getDay();
    let daysUntilMonday = 1 - currentDayOfWeek;

    // Jeśli dzisiejszy dzień to poniedziałek, nie zmieniamy daty
    if (currentDayOfWeek === 1) {
        daysUntilMonday = 0;
    } else if (currentDayOfWeek < 1) {
        daysUntilMonday = -6;
    }

    const startDate = new Date(date);
    startDate.setDate(date.getDate() + daysUntilMonday);

    // Oblicz datę końca tygodnia (6 dni po początku)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return {
        startOfWeek: startDate,
        endOfWeek: endDate,
    };
};

export default getStartAndEndOfWeek;
