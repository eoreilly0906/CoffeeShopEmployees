// importing classes from other files
import inquirer from "inquirer";


// define the Cli class
class Cli {
  // declare the vehicles property
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

 // constructor for the Cli class
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          // declare the choices for the vehicle type
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          // create a truck
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          // create a motorbike
          this.createMotorbike();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers) => {
        const car = new Car(
            // generate a vin
            Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
      ])
      .then((answers) => {
        const truck = new Truck(
          // generate a vin
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity)
        );
        // push the truck to the vehicles array
        this.vehicles.push(truck);
        // set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;
        // perform actions on the truck
        this.performActions();
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel 1 Diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel 1 Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel 2 Diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel 2 Brand',
        },
      ])
      .then((answers) => {
        const wheels = [
          new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
          new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand)
        ];
        
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          wheels
        );
        // push the motorbike to the vehicles array
        this.vehicles.push(motorbike);
        // set the selectedVehicleVin to the vin of the motorbike
        this.selectedVehicleVin = motorbike.vin;
        // perform actions on the motorbike
        this.performActions();
      });
  }

  // method to find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTowVin',
          message: 'Select a vehicle to tow',
          choices: this.vehicles
            .filter(vehicle => vehicle.vin !== truck.vin) // Filter out the truck itself
            .map((vehicle) => {
              return {
                name: `${vehicle.make} ${vehicle.model}`,
                value: vehicle.vin, // Still keep VIN as value for finding the vehicle
              };
            }),
        },
      ])
      .then((answers) => {
        const vehicleToTow = this.vehicles.find(v => v.vin === answers.vehicleToTowVin);
        if (vehicleToTow) {
          truck.tow(vehicleToTow);
        }
        this.performActions();
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
    // Find the selected vehicle
    const selectedVehicle = this.vehicles.find(
      vehicle => vehicle.vin === this.selectedVehicleVin
    );

    // Base choices available for all vehicles
    const baseChoices = [
      'Print details',
      'Start vehicle',
      'Accelerate 5 MPH',
      'Decelerate 5 MPH',
      'Stop vehicle',
      'Turn right',
      'Turn left',
      'Reverse',
      'Select or create another vehicle',
      'Exit'
    ];

    // Add specific choices based on vehicle type
    const choices = [...baseChoices];
    if (selectedVehicle instanceof Truck) {
      choices.push('Tow vehicle');
    }
    if (selectedVehicle instanceof Motorbike) {
      choices.push('Wheelie');
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: choices,
        },
      ])
      .then((answers) => {
        // perform the selected action
        if (answers.action === 'Print details') {
          // find the selected vehicle and print its details
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].printDetails();
            }
          }
        } else if (answers.action === 'Start vehicle') {
          // find the selected vehicle and start it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].start();
            }
          }
        } else if (answers.action === 'Accelerate 5 MPH') {
          // find the selected vehicle and accelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].accelerate(5);
            }
          }
        } else if (answers.action === 'Decelerate 5 MPH') {
          // find the selected vehicle and decelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].decelerate(5);
            }
          }
        } else if (answers.action === 'Stop vehicle') {
          // find the selected vehicle and stop it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].stop();
            }
          }
        } else if (answers.action === 'Turn right') {
          // find the selected vehicle and turn it right
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn('right');
            }
          }
        } else if (answers.action === 'Turn left') {
          // find the selected vehicle and turn it left
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn('left');
            }
          }
        } else if (answers.action === 'Reverse') {
          // find the selected vehicle and reverse it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].reverse();
            }
          }
        }
        // TODO: add statements to perform the tow action only if the selected vehicle is a truck. Call the findVehicleToTow method to find a vehicle to tow and pass the selected truck as an argument. After calling the findVehicleToTow method, you will need to return to avoid instantly calling the performActions method again since findVehicleToTow is asynchronous.
        else if (answers.action === 'Tow vehicle') {
          const selectedVehicle = this.vehicles.find(v => v.vin === this.selectedVehicleVin);
          if (selectedVehicle instanceof Truck) {
            this.findVehicleToTow(selectedVehicle);
            return; // Important: return here to prevent double performActions() call
          }
        }
        // TODO: add statements to perform the wheelie action only if the selected vehicle is a motorbike
        else if (answers.action === 'Wheelie') {
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              if (this.vehicles[i] instanceof Motorbike) {
                (this.vehicles[i] as Motorbike).wheelie();
              }
            }
          }
        }
        else if (answers.action === 'Select or create another vehicle') {
          // start the cli to return to the initial prompt if the user wants to select or create another vehicle
          this.startCli();
          return;
        } else {
          // exit the cli if the user selects exit
          this.exit = true;
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;