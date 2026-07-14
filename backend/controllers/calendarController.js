const CalendarEvent = require(
  "../models/CalendarEvent"
);

const createEvent = async (req, res) => {
  try {
    const { title, date } = req.body;

    const event = new CalendarEvent({
      userId: req.user.id,
      title,
      date
    });

    await event.save();

    res.status(201).json(event);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const getEvents = async (req, res) => {
  try {

    const events =
      await CalendarEvent.find({
        userId: req.user.id
      });

    res.status(200).json(events);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const deleteEvent = async (req, res) => {
  try {

    await CalendarEvent.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Event Deleted"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  deleteEvent
};