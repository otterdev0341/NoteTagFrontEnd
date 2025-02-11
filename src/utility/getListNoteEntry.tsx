import { INoteListDto } from "../domain/NoteDto";
import { getColorPalatte } from "./colorPalatte";


export function getNoteListEntry(): INoteListDto {
    
    const noteLists = [
        {
            id: "1",
            title: "Grocery List",
            content: "Buy vegetables, fruits, dairy, and other essentials for the week.",
            colorCode: "#DFFF00",
            status: "pin",
            tag: ["groceries", "shopping"],
            createdAt: new Date()
        },
        {
            id: "2",
            title: "Work Meeting",
            content: "Prepare the agenda and notes for the upcoming team meeting.",
            colorCode: "#FFBF00",
            status: "unpin",
            tag: ["work", "meeting"],
            createdAt: new Date()
        },
        {
            id: "3",
            title: "Doctor Appointment",
            content: "Visit the clinic for a routine check-up.",
            colorCode: "#FF7F50",
            status: "pin",
            tag: ["appointment", "important"],
            createdAt: new Date()
        },
        {
            id: "4",
            title: "Urgent Task",
            content: "Complete the client project before the deadline.",
            colorCode: "#DE3163",
            status: "unpin",
            tag: ["urgent", "to-do"],
            createdAt: new Date()
        },
        {
            id: "5",
            title: "Pay Bills",
            content: "Settle electricity, water, and internet bills before the due date.",
            colorCode: "#9FE2BF",
            status: "pin",
            tag: ["bills", "priority"],
            createdAt: new Date()
        },
        {
            id: "6",
            title: "Business Trip Planning",
            content: "Book flights and accommodations for the upcoming business trip.",
            colorCode: "#40E0D0",
            status: "unpin",
            tag: ["travel", "work"],
            createdAt: new Date()
        },
        {
            id: "7",
            title: "Weekly Email Check",
            content: "Respond to important emails and clear inbox clutter.",
            colorCode: "#6495ED",
            status: "pin",
            tag: ["email", "to-do"],
            createdAt: new Date()
        },
        {
            id: "8",
            title: "Secure Passwords",
            content: "Update passwords for all online accounts for security.",
            colorCode: "#CCCCFF",
            status: "unpin",
            tag: ["password", "important"],
            createdAt: new Date()
        },
        {
            id: "9",
            title: "Call Supplier",
            content: "Discuss product availability and delivery schedules.",
            colorCode: "#DFFF00",
            status: "pin",
            tag: ["call", "work"],
            createdAt: new Date()
        },
        {
            id: "10",
            title: "Project Deadline",
            content: "Ensure all project tasks are completed before the final review.",
            colorCode: "#FFBF00",
            status: "unpin",
            tag: ["urgent", "priority"],
            createdAt: new Date()
        },
        {
            id: "11",
            title: "Monthly Budget Planning",
            content: "Review this month's expenses and plan next month's budget.",
            colorCode: "#FF7F50",
            status: "pin",
            tag: ["bills", "priority"],
            createdAt: new Date()
        },
        {
            id: "12",
            title: "Client Presentation",
            content: "Finalize presentation slides and rehearse key points.",
            colorCode: "#DE3163",
            status: "unpin",
            tag: ["work", "meeting"],
            createdAt: new Date()
        },
        {
            id: "13",
            title: "Home Maintenance",
            content: "Schedule plumbing and electrical maintenance checks.",
            colorCode: "#9FE2BF",
            status: "pin",
            tag: ["to-do", "important"],
            createdAt: new Date()
        },
        {
            id: "14",
            title: "Flight Ticket Booking",
            content: "Confirm flight tickets and travel itinerary.",
            colorCode: "#40E0D0",
            status: "unpin",
            tag: ["travel", "important"],
            createdAt: new Date()
        },
        {
            id: "15",
            title: "Weekend Shopping",
            content: "Make a shopping list and visit the supermarket.",
            colorCode: "#6495ED",
            status: "pin",
            tag: ["shopping", "groceries"],
            createdAt: new Date()
        },
        {
            id: "16",
            title: "Budget Planning",
            content: "Review this month's expenses and set a budget for upcoming purchases and bills.",
            colorCode: "#CCCCFF",
            status: "pin",
            tag: ["bills", "priority"],
            createdAt: new Date()
        },
        {
            id: "17",
            title: "Work Presentation",
            content: "Prepare slides for the upcoming client meeting and finalize data points.",
            colorCode: "#DFFF00",
            status: "unpin",
            tag: ["work", "meeting"],
            createdAt: new Date()
        },
        {
            id: "18",
            title: "Doctor Follow-up",
            content: "Schedule a follow-up appointment and review latest test results.",
            colorCode: "#FFBF00",
            status: "pin",
            tag: ["appointment", "important"],
            createdAt: new Date()
        },
        {
            id: "19",
            title: "Team Building Event",
            content: "Organize a virtual team-building session for better collaboration.",
            colorCode: "#FF7F50",
            status: "unpin",
            tag: ["work", "meeting"],
            createdAt: new Date()
        },
        {
            id: "20",
            title: "Renew Subscription",
            content: "Renew software and magazine subscriptions before they expire.",
            colorCode: "#DE3163",
            status: "pin",
            tag: ["to-do", "priority"],
            createdAt: new Date()
        },
        {
            id: "21",
            title: "Bank Appointment",
            content: "Visit the bank to update KYC and discuss loan options.",
            colorCode: "#9FE2BF",
            status: "unpin",
            tag: ["appointment", "bills"],
            createdAt: new Date()
        },
        {
            id: "22",
            title: "Grocery Restock",
            content: "Restock pantry essentials and check weekly deals.",
            colorCode: "#40E0D0",
            status: "pin",
            tag: ["groceries", "shopping"],
            createdAt: new Date()
        },
        {
            id: "23",
            title: "Client Call",
            content: "Follow up with a client regarding the latest project proposal.",
            colorCode: "#6495ED",
            status: "unpin",
            tag: ["call", "work"],
            createdAt: new Date()
        },
        {
            id: "24",
            title: "Book Tickets",
            content: "Confirm flight and hotel bookings for the business trip.",
            colorCode: "#CCCCFF",
            status: "pin",
            tag: ["travel", "important"],
            createdAt: new Date()
        },
        {
            id: "25",
            title: "Pay Rent",
            content: "Transfer rent payment before the due date.",
            colorCode: "#DFFF00",
            status: "unpin",
            tag: ["bills", "priority"],
            createdAt: new Date()
        },
        {
            id: "26",
            title: "Password Reset",
            content: "Reset passwords for work and personal accounts.",
            colorCode: "#FFBF00",
            status: "pin",
            tag: ["password", "to-do"],
            createdAt: new Date()
        },
        {
            id: "27",
            title: "Submit Report",
            content: "Compile and submit monthly performance reports to management.",
            colorCode: "#FF7F50",
            status: "unpin",
            tag: ["work", "urgent"],
            createdAt: new Date()
        },
        {
            id: "28",
            title: "Call Supplier",
            content: "Discuss delivery schedules and new inventory requirements.",
            colorCode: "#DE3163",
            status: "pin",
            tag: ["call", "work"],
            createdAt: new Date()
        },
        {
            id: "29",
            title: "Check Inbox",
            content: "Sort through emails and prioritize urgent responses.",
            colorCode: "#9FE2BF",
            status: "unpin",
            tag: ["email", "urgent"],
            createdAt: new Date()
        },
        {
            id: "30",
            title: "Trip Packing",
            content: "Prepare a checklist and start packing for the upcoming vacation.",
            colorCode: "#40E0D0",
            status: "pin",
            tag: ["travel", "to-do"],
            createdAt: new Date()
        }
    ];
    
    const totalNote = noteLists.length;
    const result: INoteListDto = {
        totalNote,
        noteLists
    }

    return result;
    
}