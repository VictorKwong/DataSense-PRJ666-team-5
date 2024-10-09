import machine
import utime

# Setup ADC
adc = machine.ADC(26)  # GPIO 26, Pin 31

# Calibration values based on your readings
dry_voltage = 2.73  # Voltage for dry soil (example from your readings)
wet_voltage = 1.06  # Voltage for wet soil (example from your readings)

while True:
    # Read ADC value and convert to voltage
    moisture_value = adc.read_u16()  # Read ADC value (0-65535)
    voltage = moisture_value * 3.3 / 65535  # Convert ADC value to voltage

    # Calculate moisture percentage
    if voltage >= dry_voltage:
        moisture_percentage = 0  # Dry soil
    elif voltage <= wet_voltage:
        moisture_percentage = 100  # Fully saturated soil
    else:
        # Scale the voltage to a percentage between dry and wet readings
        moisture_percentage = ((dry_voltage - voltage) / (dry_voltage - wet_voltage)) * 100

    print(f"Moisture Level: {moisture_percentage:.2f}%, Voltage: {voltage:.2f}V")
    utime.sleep(1)
