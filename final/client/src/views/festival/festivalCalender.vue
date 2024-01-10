<template>
  <div class="calendar">
    <h2 class="yearmon">
      <a href="#" v-on:click="onClickPrev(currentMonth)">◀</a>
      {{ currentYear }}년 {{ currentMonth }}월
      <a href="#" v-on:click="onClickNext(currentMonth)">▶</a>
    </h2>
    <br />
    <table class="table">
      <thead>
        <tr>
          <td v-for="(weekName, index) in weekNames" v-bind:key="index">
            <!-- 요일 -->
            {{ weekName }}
          </td>
        </tr>
      </thead>

      <tbody @click="selectedDate">
        <tr v-for="(row, index) in currentCalendarMatrix" :key="index">
          <td v-for="(day, index2) in row" :key="index2" style="padding: 20px">
            <span
              v-if="isToday(currentYear, currentMonth, day)"
              class="rounded"
            >
              {{ day }}
            </span>

            <!-- script 쪽에 메소드 isSunday true인지 확인해서 맞으면 빨강으로  -->
            <span
              v-else
              class="day"
              :style="{ color: isSunday(index2) ? 'red' : 'black' }"
            >
              <!-- 일자 -->
              {{ day }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="container">
      <div class="row">
        <div
          v-for="(fes, i) in fesCalList"
          :key="i"
          class="col-md-3 mb-4"
          @click="goFesInfo(fes.f_code)"
        >
          <div class="card">
            <img
              :src="`/api/festival/public/uploads/${fes.fesImg}`"
              class="card-img-top"
              alt="이미지가 존재하지 않습니다."
              style="height: 250px"
            />
            <div class="card-body">
              <h5 class="card-title">{{ fes.f_name }}</h5>
              <p class="card-text">
                {{ getDateFormat(fes.f_firstday) }} ~
                {{ getDateFormat(fes.f_lastday) }}
              </p>
              <p class="card-text">{{ fes.f_reg }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Calendar",
  data() {
    return {
      weekNames: [
        "일요일", // Sunday
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
      ],
      rootYear: 1904,
      rootDayOfWeekIndex: 4, // 2000년 1월 1일은 토요일
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      currentDay: new Date().getDate(),
      currentMonthStartWeekIndex: null,
      currentCalendarMatrix: [],
      endOfDay: null,
      memoDatas: [],
      festivalList: [],
      fesCalList: [],
    };
  },
  created() {
    // this.getFestivalList();
    this.getFesCalList();
  },
  mounted() {
    this.init();
    this.getFesCalListForToday();
  },
  methods: {
    // isSunday 가 일요일인지 확인(index가 0인지)
    isSunday(index) {
      return index === 0;
    },

    async getFesCalList(date) {
      this.fesCalList = (
        await axios
          .get(`/api/festival/calender/${date}`)
          .catch((err) => console.log(err))
      ).data;
    },
    // async getFestivalList(){
    //     this.festivalList = (await axios.get('/api/festival')
    //                         .catch(err => console.log(err))).data;
    // },
    goFesInfo(f_code) {
      this.$router.push({ path: "/festivalInfo", query: { f_code: f_code } });
    },
    getDateFormat(date) {
      return this.$dateFormat(date); // 날짜 변환
    },

    init: function () {
      this.currentMonthStartWeekIndex = this.getStartWeek(
        this.currentYear,
        this.currentMonth
      );
      this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
      this.initCalendar();
    },
    initCalendar: function () {
      this.currentCalendarMatrix = [];
      let day = 1;
      for (let i = 0; i < 6; i++) {
        let calendarRow = [];
        for (let j = 0; j < 7; j++) {
          if (i == 0 && j < this.currentMonthStartWeekIndex) {
            calendarRow.push("");
          } else if (day <= this.endOfDay) {
            calendarRow.push(day);
            day++;
          } else {
            calendarRow.push("");
          }
        }
        this.currentCalendarMatrix.push(calendarRow);
      }
    },
    getEndOfDay: function (year, month) {
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return 31;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          return 30;
          break;
        case 2:
          if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            return 29;
          } else {
            return 28;
          }
          break;
        default:
          console.log("unknown month " + month);
          return 0;
          break;
      }
    },
    getStartWeek: function (targetYear, targetMonth) {
      let year = this.rootYear;
      let month = 1;
      let sumOfDay = this.rootDayOfWeekIndex;
      while (true) {
        if (targetYear > year) {
          for (let i = 0; i < 12; i++) {
            sumOfDay += this.getEndOfDay(year, month + i);
          }
          year++;
        } else if (targetYear == year) {
          if (targetMonth > month) {
            sumOfDay += this.getEndOfDay(year, month);
            month++;
          } else if (targetMonth == month) {
            return sumOfDay % 7;
          }
        }
      }
    },
    onClickPrev: function (month) {
      month--;
      if (month <= 0) {
        this.currentMonth = 12;
        this.currentYear -= 1;
      } else {
        this.currentMonth -= 1;
      }
      this.init();
    },
    onClickNext: function (month) {
      month++;
      if (month > 12) {
        this.currentMonth = 1;
        this.currentYear += 1;
      } else {
        this.currentMonth += 1;
      }
      this.init();
    },
    isToday: function (year, month, day) {
      let date = new Date();
      return (
        year == date.getFullYear() &&
        month == date.getMonth() + 1 &&
        day == date.getDate()
      );
    },
    selectedDate(event) {
      let date = `${this.currentYear}-${this.currentMonth}-${Number(
        event.target.textContent
      )}`;
      this.getFesCalList(date);
    },
    handleDateClick(event) {
      const clickedDate = event.target.textContent;

      if (clickedDate && !isNaN(clickedDate)) {
        const date = `${this.currentYear}-${this.currentMonth}-${Number(
          clickedDate
        )}`;
        this.getFesCalList(date);

        this.$emit("date-clicked", date);
      }
    },

    // default 값을 오늘날짜로 줘서 오늘날짜에 해당하는 축제를 먼저 뽑아옴
    async getFesCalListForToday() {
      const today = new Date();
      const date = `${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}`;
      this.fesCalList = (
        await axios
          .get(`/api/festival/calender/${date}`)
          .catch((err) => console.log(err))
      ).data;
    },
  },
};
</script>

<style scoped>
.yearmon {
  text-align: center;
}

/* Calendar styling */
.calendar {
  max-width: 800px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
}

.calendar h2.yearmon {
  text-align: center;
  color: #333;
  margin-bottom: 20px; /* Add some spacing below the month navigation */
}

.calendar .table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px; /* Add some spacing below the calendar */
}

.calendar .table th,
.calendar .table td {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
  font-size: 14px;
}

.calendar .table th {
  background-color: #f2f2f2;
}

.calendar .day {
  cursor: pointer;
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
  color: #333;
  transition: background-color 0.3s ease;
}

.calendar .day:hover {
  background-color: darkorchid;
  border-radius: 30px;
}

.calendar .rounded {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
  color: #fff;
  background-color: #2b6bd1;
  border-radius: 50%;
}

.calendar .rounded:hover {
  background-color: #265496;
}

/* Keep the existing styling for the festival list */
.container {
  margin: 20px auto;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}

.card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-body {
  padding: 15px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.card-text {
  font-size: 14px;
  color: #555;
}

.card:active {
  background-color: #e0e0e0;
}
</style>
