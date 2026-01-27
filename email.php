<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid JSON received"]);
    exit;
}

// Sanitize inputs
$fullName     = htmlspecialchars($data["fullName"] ?? "");
$phone        = htmlspecialchars($data["phone"] ?? "");
$location     = htmlspecialchars($data["location"] ?? "");
$vehicleMake  = htmlspecialchars($data["vehicleMake"] ?? "");
$vehicleModel = htmlspecialchars($data["vehicleModel"] ?? "");
$vehicleYear  = htmlspecialchars($data["vehicleYear"] ?? "");
$amount       = htmlspecialchars($data["amount"] ?? "");
$duration     = htmlspecialchars($data["duration"] ?? "");
$insurance    = isset($data["insurance"]) && $data["insurance"] ? "Yes" : "No";

// Email setup
$to      = "info@firefly.co.ke";
$subject = "🚗 New Logbook Loan Application";

$message = "
A new Logbook Loan application has been submitted:

PERSONAL DETAILS
----------------
Name: $fullName
Phone: $phone
Location: $location

VEHICLE DETAILS
---------------
Make: $vehicleMake
Model: $vehicleModel
Year: $vehicleYear

LOAN DETAILS
------------
Amount: KES $amount
Duration: $duration
Insurance: $insurance
";

$headers  = "From: Logbook Loan System <no-reply@firefly.co.ke>\r\n";
$headers .= "Reply-To: $phone\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["success" => true, "message" => "Email sent"]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Email failed. Server may not support mail()."
    ]);
}
?>
