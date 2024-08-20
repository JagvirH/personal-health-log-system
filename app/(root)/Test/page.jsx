"use client"

import { testAddLog, testDeleteLog, testAddTagsToLog, testAddSolutionsToLog, testAddOpinionToLog } from '@/backend/database/statTesting';
import React, { useState } from 'react';
import { getTag } from '@/backend/database/tags';

const Page = () => {
    const tags = getTag()
    console.log("HERE")
    console.log(tags)

    const [createdLogIds, setCreatedLogIds] = useState([]);

    /*
    // Array of logs data
    const logs = [
        [1, "test1", "test1"], // First log data
        [1, "Hello", "test1"]  // Second log data
    ];

    // Array of tags for corresponding logs
    const logTags = [
        [1, 2, 3], // Tags for the first log
        [1, 2]     // Tags for the second log
    ];

    const logSolution = [
        ['smfr'],  // Solution for the first log
        ['wrgberj'] // Solution for the second log
    ];

    const logOpinion = [
        [['sefwf', 1]],   // Opinions for the first log
        [['wefwef', 1]]   // Opinions for the second log
    ];
    */

    // Logs Data Array
const logs = [
    // Common Cold Entries
    [1, "Common Cold with Mild Symptoms", "Experiencing mild symptoms like sneezing, runny nose, and slight fatigue."],
    [1, "Cold with Persistent Cough", "Coughing continuously, with a stuffy nose and sore throat."],
    [1, "Headache and Congestion", "Suffering from a headache and heavy congestion due to a cold."],
    [1, "Fatigue and Sore Throat", "Feeling very tired with a sore throat and mild fever."],
    [1, "Stubborn Cold Symptoms", "Symptoms linger, including sneezing and runny nose."],
    [1, "Cold Causing Sleep Issues", "Cold symptoms make it hard to sleep; coughing and congestion are the main problems."],
    [1, "Cold with Body Aches", "Body aches, particularly in the arms and legs, along with cold symptoms."],
    [1, "Day 3 of a Common Cold", "Day 3 of cold, symptoms are persistent but manageable."],
    [1, "Runny Nose and Fatigue", "Runny nose, tiredness, and mild fever. Resting and hydrating."],
    [1, "Cold with Dry Skin", "Cold has led to dry skin around the nose due to constant blowing."],
    [1, "Common Cold on a Rainy Day", "Symptoms worsen due to weather changes, especially sneezing and congestion."],
    [1, "Lingering Common Cold", "Cold persists for a week with recurring congestion and fatigue."],
    [1, "Cold with Sore Muscles", "Experiencing sore muscles, particularly in the back, due to persistent coughing."],
    [1, "Recovery from Common Cold", "Symptoms are easing, but fatigue and slight cough remain."],
    [1, "Seasonal Cold Symptoms", "Symptoms flared up with the season change, especially congestion and sneezing."],

    // Migraine Entries
    [1, "Migraine with Light Sensitivity", "Severe migraine with sensitivity to light and sound."],
    [1, "Migraine Causing Nausea", "Migraine attack causing intense nausea and vomiting."],
    [1, "Migraine with Aura", "Migraine with visual disturbances and a pounding headache."],
    [1, "Frequent Migraine Attacks", "Having frequent migraines this week, each lasting several hours."],
    [1, "Migraine Triggered by Stress", "Stress has triggered another migraine with intense pain."],
    [1, "Migraine After Poor Sleep", "Migraine flared up after a night of poor sleep, causing throbbing pain."],
    [1, "Migraine with Sinus Pain", "Experiencing a migraine combined with sinus pain and pressure."],
    [1, "Migraine Attack During Work", "Migraine attack during work; sensitivity to light made it difficult to focus."],
    [1, "Day 2 of a Migraine", "Second day of migraine, pain is still intense with no relief."],
    [1, "Recurring Migraines", "Recurring migraines every other day; medication helps only a little."],
    [1, "Migraine with Neck Pain", "Migraine combined with neck stiffness and pain."],
    [1, "Migraine with Eye Strain", "Migraine likely caused by too much screen time, causing eye strain and pain."],
    [1, "Migraine with Vomiting", "Severe migraine leading to nausea and vomiting, lying in a dark room."],
    [1, "Migraine After Exercise", "Migraine triggered after intense exercise, possibly due to dehydration."],
    [1, "Migraine During Hot Weather", "Hot weather seems to have triggered a migraine, feeling nauseous and dizzy."]
];

// Tags for Corresponding Logs
const logTags = [
    // Tags for Common Cold Logs
    [12, 16, 21, 20], [12, 15, 21, 17], [12, 13, 21], [12, 14, 17, 20], [12, 16, 21], 
    [12, 15, 21, 20], [12, 7, 20], [12, 21], [12, 21, 20], [12, 9], 
    [12, 21, 16], [12, 21, 20], [12, 7, 15], [12, 15, 21], [12, 21, 16],

    // Tags for Migraine Logs
    [23, 13, 18], [23, 18], [23, 13], [23, 13, 20], [23, 13], 
    [23, 13, 14], [23, 13, 21], [23, 13, 14], [23, 13], [23, 13, 20], 
    [23, 13, 7], [23, 13, 5], [23, 18], [23, 13, 18], [23, 13, 14]
];

// Solutions for Corresponding Logs
const logSolution = [
    // Solutions for Common Cold Logs
    ['Drinking warm fluids, resting, and using nasal spray.'], 
    ['Taking cough syrup, resting, and using a humidifier.'], 
    ['Taking pain relievers, using nasal decongestants, and staying hydrated.'], 
    ['Using throat lozenges, staying warm, and getting plenty of rest.'], 
    ['Taking antihistamines and drinking herbal teas.'], 
    ['Using a humidifier, taking cough medicine, and sleeping with an extra pillow.'], 
    ['Applying a warm compress, taking pain relievers, and resting.'], 
    ['Drinking herbal teas, resting, and using nasal strips at night.'], 
    ['Taking cold medicine, drinking hot liquids, and staying indoors.'], 
    ['Applying moisturizer to dry areas and drinking more water.'], 
    ['Using nasal spray, resting, and staying indoors to avoid cold air.'], 
    ['Drinking hot tea, resting, and taking decongestants.'], 
    ['Taking pain relievers, applying a warm compress, and resting.'], 
    ['Using cough drops, drinking herbal teas, and getting extra sleep.'], 
    ['Taking allergy medicine, drinking more water, and staying warm.'], 

    // Solutions for Migraine Logs
    ['Taking migraine medication and avoiding bright lights.'], 
    ['Taking prescribed medication and resting in a dark, quiet room.'], 
    ['Taking prescribed migraine medication and lying down until the aura passes.'], 
    ['Taking migraine medication and applying cold packs to the head.'], 
    ['Taking prescribed medication and practicing stress management techniques.'], 
    ['Taking medication and avoiding bright screens or lights.'], 
    ['Taking migraine medication and using sinus relief techniques.'], 
    ['Taking medication and resting with eyes closed in a dark room.'], 
    ['Taking prescribed medication and staying hydrated.'], 
    ['Taking prescribed medication and trying to stay in a calm environment.'], 
    ['Taking pain relievers, massaging the neck, and resting.'], 
    ['Taking medication, reducing screen time, and using blue light filters.'], 
    ['Taking prescribed medication, lying down, and sipping on ginger tea.'], 
    ['Taking medication, drinking water, and avoiding intense activities.'], 
    ['Taking prescribed medication, staying cool, and lying down in a dark room.']
];

// Opinions for Corresponding Logs
// Opinions for Corresponding Logs
const logOpinion = [
    // Opinions for Common Cold Logs
    [['Warm fluids and rest help alleviate symptoms.', 1], ['Nasal spray reduces congestion.', 2]],  // GP and Online
    [['Cough syrup works well, but the taste is terrible.', 2], ['Humidifier helps with the dry throat.', 1]], // Online and GP
    [['Pain relievers help manage the headache.', 1], ['Decongestants clear the nasal passages.', 2]], // GP and Online
    [['Throat lozenges are soothing.', 2], ['Staying warm helps reduce symptoms.', 1]], // Online and GP
    [['Antihistamines relieve symptoms but cause drowsiness.', 1], ['Herbal teas are comforting.', 2]], // GP and Online
    [['Humidifier helps, but cleaning it is a hassle.', 2], ['Cough medicine helps me sleep better.', 1]], // Online and GP
    [['Warm compress eases body aches.', 1], ['Pain relievers are effective.', 2]], // GP and Online
    [['Herbal teas calm the symptoms.', 2], ['Nasal strips help me breathe better at night.', 1]], // Online and GP
    [['Cold medicine is effective, but makes me drowsy.', 1], ['Hot liquids are soothing.', 2]], // GP and Online
    [['Moisturizer soothes dry skin.', 2], ['Drinking water hydrates me better.', 1]], // Online and GP
    [['Nasal spray clears congestion.', 1], ['Staying indoors reduces symptom flare-ups.', 2]], // GP and Online
    [['Hot tea soothes the throat.', 2], ['Decongestants clear my sinuses.', 1]], // Online and GP
    [['Pain relievers manage body aches.', 1], ['Warm compresses are soothing.', 2]], // GP and Online
    [['Cough drops ease my sore throat.', 2], ['Extra sleep speeds up recovery.', 1]], // Online and GP
    [['Allergy medicine helps, but causes dryness.', 1], ['Staying warm reduces symptoms.', 2]], // GP and Online

    // Opinions for Migraine Logs
    [['Taking medication helps reduce pain quickly.', 1], ['Avoiding bright lights minimizes pain.', 2]], // GP and Online
    [['Migraine medication reduces nausea.', 2], ['Resting in a dark room is essential.', 1]], // Online and GP
    [['Medication eases the aura, but not the headache.', 1], ['Lying down during an aura is helpful.', 2]], // GP and Online
    [['Cold packs reduce pain slightly.', 2], ['Medication provides some relief.', 1]], // Online and GP
    [['Managing stress prevents some migraines.', 1], ['Avoiding stress is important.', 2]], // GP and Online
    [['Medication helps, but sleep is the best cure.', 2], ['Bright screens trigger migraines.', 1]], // Online and GP
    [['Sinus relief techniques help, but not completely.', 1], ['Sinus pain worsens migraines.', 2]], // GP and Online
    [['Dark rooms are necessary for recovery.', 2], ['Medication is effective when taken early.', 1]], // Online and GP
    [['Hydration helps prevent migraines.', 1], ['Medication is essential.', 2]], // GP and Online
    [['Calm environments reduce the frequency of migraines.', 2], ['Medication works best when taken early.', 1]], // Online and GP
    [['Neck massages alleviate stiffness.', 1], ['Pain relievers help, but not enough.', 2]], // GP and Online
    [['Reducing screen time is crucial.', 2], ['Blue light filters help prevent migraines.', 1]], // Online and GP
    [['Ginger tea soothes nausea.', 1], ['Medication helps the headache but not nausea.', 2]], // GP and Online
    [['Staying hydrated prevents post-exercise migraines.', 2], ['Medication is sometimes necessary.', 1]], // Online and GP
    [['Keeping cool in hot weather helps.', 1], ['Resting in a dark room reduces pain.', 2]], // GP and Online
];



    const handleAddClick1 = async () => {
        console.log('Adding logs');
        const newLogIds = [];
        

        for (let i = 0; i < logs.length; i++) {
            const [userId, title, description] = logs[i];
            const tags = logTags[i];
            const solutions = logSolution[i];
            const opinions = logOpinion[i];

            try {

                const logId = await testAddLog({ userId, title, description });
                newLogIds.push(logId);

                // Add the associated tags for this log
                if (logId && tags) {
                    await testAddTagsToLog(logId, tags);
                }

                // Add the associated solutions for this log
                if (logId && solutions) {
                    await testAddSolutionsToLog(logId, solutions);
                }

                // Add the associated opinions for this log
                if (logId && opinions) {
                    await testAddOpinionToLog(logId, opinions);
                }

            } catch (error) {
                console.error("Error adding log, tags, solutions, or opinions:", error);
            }
        }

        // Store the created log IDs in state
        setCreatedLogIds(newLogIds);
    };

    const handleRemoveClick1 = () => {
        console.log('Removing logs');
        const id = "1";
        testDeleteLog({ id });
    };

    return (
        <div>
            <div>
                Test 1
                <div>
                    <div className='blue_button' onClick={handleAddClick1}>
                        add
                    </div>
                </div>
                <div>
                    <div className='blue_button' onClick={handleRemoveClick1}>
                        remove
                    </div>
                </div>
            </div>
            <div>
                <h3>Created Log IDs:</h3>
                <ul>
                    {createdLogIds.map(id => (
                        <li key={id}>{id}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Page;
