import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { api } from '../utils/api';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween)

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
`;

const CalendarGrid = styled.div<{$days: number;}>`
  display: grid;
  grid-template-columns: 200px repeat(${props => props.$days || 31}, 1fr);
  grid-template-rows: 50px repeat(10, 40px);
  gap: 1px;
`;

const CalendarCell = styled.div`
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserCell = styled(CalendarCell)`
  background-color: #f5f5f5;
  font-weight: bold;
`;

const DateHeaderCell = styled(CalendarCell)`
  background-color: #eee;
  font-weight: bold;
`;

const VacationCell = styled(CalendarCell)`
  background-color: #ffeb3b;
`;

const CalendarTimeline: React.FC = () => {
  const [daysInMonth, setDaysInMonth] = useState(Array.from(Array(dayjs().daysInMonth()), (_, i) => i + 1));
  
  // const { data: yearlyVacations } =
  //   api.user.getAllUsersYearlyVacations.useQuery({
  //     year: selectedYear,
  //   });
  const yearlyVacations = [{
    userName: "Dope",
    vacationRequests: [
      {startDate:"2024-07-02", endDate:"2024-07-08"}
    ]
  }]

  const [currentDate, setCurrentDate] = useState(dayjs());


  const handlePreviousMonth = () => {
    setDaysInMonth(Array.from(Array(currentDate.subtract(1,'month').daysInMonth()), (_, i) => i + 1))
    setCurrentDate(currentDate.subtract(1,'month'));
  };

  const handleNextMonth = () => {
    setDaysInMonth(Array.from(Array(currentDate.add(1,'month').daysInMonth()), (_, i) => i + 1))
    setCurrentDate(currentDate.add(1,'month'));
  };

  useEffect(() => {
    // Update the number of days in the month whenever the currentDate changes
  }, [currentDate]);


  return (
    <CalendarContainer>
      <CalendarHeader>
        <button onClick={handlePreviousMonth}>{'<'}</button>
        <h1>{currentDate.format('MMMM - YYYY')}</h1>
        <button onClick={handleNextMonth}>{'>'}</button>
      </CalendarHeader>
      <CalendarGrid $days={daysInMonth.length}>
        <UserCell>Vacations</UserCell>
        {daysInMonth.map((day) => (
          <DateHeaderCell key={day}>{day}</DateHeaderCell>
        ))}
        {yearlyVacations?.map((user) => (
          <React.Fragment key={user.userName}>
            <UserCell>{user.userName}</UserCell>
            {daysInMonth.map((day) => {
              const cellDay = currentDate.date(day);
              const isVacationDay = user.vacationRequests.some(
                (vacation) =>
                  cellDay.isBetween(vacation.startDate, vacation.endDate, "day", "[]")
              );
              return isVacationDay ? (
                <VacationCell key={`${user.userName}-${day}`} />
              ) : (
                <CalendarCell key={`${user.userName}-${day}`} />
              );
            })}
          </React.Fragment>
        ))}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default CalendarTimeline;