import QR_PAY from "../QR_PAY"; // Import the QR_PAY component

function AddFunds() {
  return (
    <div className="min-h-screen bg-my-gradient-1 flex justify-center mx-auto py-4">
      <div className="mx-auto flex flex-col items-center">
        {/* Render QR_PAY content directly */}
        <QR_PAY />
      </div>
    </div>
  );
}

export default AddFunds;
