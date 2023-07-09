import { Component, enableProdMode } from '@angular/core';

interface Seat {
  number: number;
  row: number;
  status: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';

  totalSeats = 80;
  seatsPerRow = 7;
  lastRowSeats = 3;
  rows = Math.ceil(this.totalSeats / this.seatsPerRow);
  seats: Seat[] = [];

  constructor() {
    // Initialize the seats with their initial status
    this.initSeats();
  }

  initSeats(): void {
    for (let row = 1; row <= this.rows; row++) {
      const seatsInRow =
        row === this.rows ? this.lastRowSeats : this.seatsPerRow;

      for (let seatNumber = 1; seatNumber <= seatsInRow; seatNumber++) {
        this.seats.push({
          number: seatNumber,
          row: row,
          status: 'available',
        });
      }
    }
  }

  reserveSeats(numSeats: number): void {
    const availableSeats = this.getAvailableSeats();
    const selectedSeats: Seat[] = [];

    if (availableSeats.length < numSeats) {
      console.log('Not enough seats available.');
      return;
    }

    for (let i = 0; i < numSeats; i++) {
      selectedSeats.push(availableSeats[i]);
    }

    selectedSeats.forEach((seat) => {
      seat.status = 'reserved';
    });

    console.log('Selected seats:', selectedSeats);
    enableProdMode();
  }

  getAvailableSeats(): Seat[] {
    return this.seats.filter((seat) => seat.status === 'available');
  }
}
