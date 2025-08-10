import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utills/constants'

const Premium = () => {


    const handlePaymentType = async (type) => {
        try {
            const order = await axios.post(`${BASE_URL}payment/create`, { membershipType: type }, { withCredentials: true })

            const { orderId, amount, notes, currency, keyId } = order.data

            const options = {
                key: keyId,
                amount,
                currency,
                name: 'DevTinder',
                description: 'Connect to Other Developer',
                order_id: orderId,

                prefill: {
                    name: notes.firstName + " " + notes.lastName,
                    email: notes.emailId,
                    contact: '9999999999'
                },
                theme: {
                    color: '#F37254'
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        catch (err) {
            console.error(err)
        }
    }

    // it should open the razorpay dialog box



    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f051d] to-[#1f0730] text-white p-6">
            <h1 className="text-4xl font-bold text-center mb-12 text-purple-400">Premium Membership</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Free Plan */}
                <div className="bg-[#1a0b2e] rounded-2xl p-6 shadow-lg border border-purple-600">
                    <h2 className="text-2xl font-semibold mb-4 text-purple-300">Free Plan</h2>
                    <p className="text-sm mb-6 text-gray-300">Get started and explore DevTinder.</p>
                    <ul className="space-y-2 mb-6 text-gray-300">
                        <li>✅ Access to community</li>
                        <li>✅ Match with devs</li>
                        <li>🚫 No real-time chat</li>
                    </ul>
                    <button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg transition">Start Free</button>
                </div>

                {/* Pro Plan */}
                <div className="bg-[#280d45] rounded-2xl p-6 shadow-2xl border-2 border-pink-600 transform scale-105">
                    <h2 className="text-3xl font-bold mb-4 text-pink-400">Pro Plan</h2>
                    <p className="text-sm mb-6 text-gray-300">For devs looking to collaborate seriously.</p>
                    <ul className="space-y-2 mb-6 text-gray-300">
                        <li>✅ All Free features</li>
                        <li>✅ Real-time chat</li>
                        <li>✅ Project collaboration</li>
                    </ul>
                    <button onClick={() => handlePaymentType("pro")} className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition">Upgrade to Pro</button>
                </div>

                {/* Elite Plan */}
                <div className="bg-[#1a0b2e] rounded-2xl p-6 shadow-lg border border-blue-600">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-300">Elite Plan</h2>
                    <p className="text-sm mb-6 text-gray-300">For top-tier devs & project leads.</p>
                    <ul className="space-y-2 mb-6 text-gray-300">
                        <li>✅ All Pro features</li>
                        <li>✅ Dedicated support</li>
                        <li>✅ Early access to beta features</li>
                    </ul>
                    <button onClick={() => handlePaymentType("elite")} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">Go Elite</button>
                </div>
            </div>
        </div>
    );
}

export default Premium