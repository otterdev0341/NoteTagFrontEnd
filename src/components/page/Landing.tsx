import "./landing.css";

export default function Landing() {

    return (
        <div className="landing">
            <div className="content-section">
                {/* new era of flex */}
                <div className="image-side">
                    <div className="image1">
                        <img className="main-photo" src="https://plus.unsplash.com/premium_photo-1685287728537-0294d6e61a3e?q=80&w=992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="blank noot book" />
                    </div>
                    <div className="image2">
                        <img className="two-nd-photo" src="https://images.unsplash.com/photo-1503551723145-6c040742065b-v2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="sticky note" />
                    </div>
                    <div className="image3">
                        <img className="three-rd-photo" src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="dev shake hand" />
                    </div>
                </div>
                <div className="context-side">
                    {/* start content area */}
                    <div className="landing-text">
                        <h4 style={{textAlign: "center", paddingTop: "10px"}}>
                            What is Note List App?
                        </h4>
                        <p className="landing-text-content">
                            In today’s fast-paced world, keeping track of tasks, ideas, and important 
                            notes can be overwhelming. The Note List App is designed to simplify your 
                            life by providing an easy-to-use platform where you can store, organize, 
                            and manage all your notes efficiently. Whether you need a personal notepad, 
                            a task manager, or a brainstorming tool, this app has got you covered.
                        </p>
                        <p>
                            With a clean and user-friendly interface, the Note List App ensures that you 
                            can quickly capture information, categorize it, and retrieve it whenever you 
                            need it. Say goodbye to messy sticky notes and scattered paper 
                            reminders—everything you need is in one place, just a click away.


                        </p>
                    </div>
                    <div className="landing-text">
                        <h4 style={{textAlign: "center", paddingTop: "10px"}}>
                            What is Note List App?
                        </h4>
                        <p className="landing-text-content">
                            In today’s fast-paced world, keeping track of tasks, ideas, and important 
                            notes can be overwhelming. The Note List App is designed to simplify your 
                            life by providing an easy-to-use platform where you can store, organize, 
                            and manage all your notes efficiently. Whether you need a personal notepad, 
                            a task manager, or a brainstorming tool, this app has got you covered.
                        </p>
                        <p>
                            With a clean and user-friendly interface, the Note List App ensures that you 
                            can quickly capture information, categorize it, and retrieve it whenever you 
                            need it. Say goodbye to messy sticky notes and scattered paper 
                            reminders—everything you need is in one place, just a click away.


                        </p>
                    </div>
                    <div>
                    <h4>Key Features in Detail</h4>
                    <ul className="landing-text-content">
                        <li>
                            <h5 className="sub-header">Easy Note Creation</h5>
                            <p className="sub-header-content">With just a few taps, you can create a new note and start jotting down your thoughts. Whether it’s a grocery list, a meeting reminder, or a brilliant idea, you’ll always have a space to store it.</p>
                        </li>
                        <li>
                            <h5 className="sub-header">Customizable Notes with Colors & Categories</h5>
                            <p className="sub-header-content">Personalize your notes by categorizing them into different folders or color-coding them for quick identification. Organize work notes, personal reminders, and creative ideas separately to keep your digital notebook neat and structured.</p>
                        </li>
                        <li>
                            <h5 className="sub-header">Advanced Search & Filtering</h5>
                            <p className="sub-header-content">No more scrolling through endless notes! The built-in search function allows you to quickly find what you're looking for by keyword, category, or even color.</p>
                        </li>
                        <li>
                            <h5 className="sub-header">Sync Across Devices & Backup Your Data</h5>
                            <p className="sub-header-content">Access your notes from your phone, tablet, or computer with seamless cloud synchronization. Your data is backed up automatically, ensuring you never lose a single note.</p>
                        </li>
                    </ul>
                </div>
                <div className="dev-msg-section">
                    <h4>A Message from the Note List Dev Team</h4>
                    <div>Dear Users</div>
                    <div >Note List was built with a simple goal: to help you organize your thoughts and tasks effortlessly.
                    Thank You for Being a Part of Our Journey!
                    Stay organized, stay productive!
                    <em>The Note List Team</em></div>
                </div>
                </div> {/* end content area */}
            </div>
        </div>
    );
}
