import React, { useState } from "react";

interface Day {
  date: string; // Formato: YYYY-MM-DD
  available: boolean;
}

interface MonthData {
  month: string;
  days: Day[];
}

interface CalendarData {
  year: number;
  months: MonthData[];
}

interface CalendarProps {
  calendars: { [year: number]: CalendarData }; // Objeto que contiene calendarios por año
  onToggleDay?: (day: Day) => void;
}

const Calendar: React.FC<CalendarProps> = ({ calendars, onToggleDay }) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth()); // 0 = January, 11 = December

  // Obtiene el calendario para el año actual
  const currentCalendar = calendars[currentYear];

  // Si no existe el calendario para el año, se podría renderizar un mensaje o un loading
  if (!currentCalendar) {
    return <div>Loading calendar for {currentYear}...</div>;
  }

  // Obtiene el mes actual usando el índice (asumiendo que el array de meses está ordenado de enero a diciembre)
  const currentMonthData = currentCalendar.months[currentMonth];
  let previousMonthData: MonthData | null = null;
  let nextMonthData: MonthData | null = null;

  // Si el mes actual es mayor a 0, se puede obtener del mismo calendario
  if (currentMonth > 0) {
    previousMonthData = currentCalendar.months[currentMonth - 1];
  } else {
    // Si es enero (índice 0), intenta obtener diciembre del año anterior
    const prevYearCalendar = calendars[currentYear - 1];
    if (prevYearCalendar) {
      previousMonthData = prevYearCalendar.months[11]; // diciembre
    }
  }

  // Para el mes siguiente, si el índice actual es menor que 11, está en el mismo calendario
  if (currentMonth < currentCalendar.months.length - 1) {
    nextMonthData = currentCalendar.months[currentMonth + 1];
  } else {
    // Si es diciembre (índice 11), intenta obtener enero del año siguiente
    const nextYearCalendar = calendars[currentYear + 1];
    if (nextYearCalendar) {
      nextMonthData = nextYearCalendar.months[0]; // enero
    }
  }

  // Si no hay datos para el mes actual, se puede mostrar un mensaje
  if (!currentMonthData) {
    return <div>No data for this month.</div>;
  }
  // Calculamos cuántas celdas vacías (null) hay antes del primer día.
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  let startDayIndex = firstDayOfMonth.getDay();
  // Ajuste para que la semana comience en lunes: si getDay() es 0 (domingo), lo tratamos como 7
  if (startDayIndex === 0) {
    startDayIndex = 7;
  }
  startDayIndex = startDayIndex - 1; // Ahora lunes = 0, martes = 1, etc.

  // Construimos un array para representar la cuadrícula
  const calendarCells: (Day | null)[] = [];

  // Handlers para cambiar de mes
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  for (let i = startDayIndex; i > 0; i--) {
    if (previousMonthData) {
      previousMonthData?.days.map((day)=> {
        day.available = false
      })
      let prevDay = previousMonthData?.days.length - i
      calendarCells.push( previousMonthData?.days[prevDay]);
      console.log(calendarCells);
      
    } else {
      calendarCells.push(null);
    }

  }
  // Se agregan los días del mes
  currentMonthData.days.forEach((day) => {
    calendarCells.push(day);
  });
  const rest = 42 - calendarCells.length 
  // Se rellenan las celdas restantes hasta tener 42 celdas
  while (calendarCells.length < 42) {
    if (nextMonthData) {
    let nextDay =  calendarCells.length  + rest - 42 
    calendarCells.push(nextMonthData.days[nextDay]);
    
  } else {
    calendarCells.push(null);
  }
  }

  // Dividir el array en semanas (7 celdas cada una)
  const weeks = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    weeks.push(calendarCells.slice(i, i + 7));
  }

  // Función para manejar la acción al hacer clic en un día
  const toggleDayBlock = (day: Day) => {
    if (onToggleDay) {
      onToggleDay(day);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={handlePrevMonth}>Previous</button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    backgroundColor: day
                      ? day.available
                        ? "#fff"
                        : "#fdd"
                      : "#eee",
                    textAlign: "center",
                    cursor: day ? "pointer" : "default",
                  }}
                  onClick={() => day && toggleDayBlock(day)}
                >
                  {day ? day.date : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
