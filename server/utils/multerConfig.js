import multer from "multer";

// ================= Syllabus Upload =================

const syllabusStorage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, "uploads/syllabus");
    },
    filename: (req, file, cb) =>
    {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const uploadSyllabus = multer({
    storage: syllabusStorage,
    limits: { fileSize: 3 * 1024 * 1024 },
    fileFilter: (req, file, cb) =>
    {
        if (file.mimetype === "application/pdf")
        {
            cb(null, true);
        } else
        {
            cb(new Error("Only PDF allowed"), false);
        }
    }
});


// ================= Fees Upload =================

const feesStorage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, "uploads/fees");
    },
    filename: (req, file, cb) =>
    {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const uploadFees = multer({
    storage: feesStorage,
    limits: { fileSize: 3 * 1024 * 1024 },
    fileFilter: (req, file, cb) =>
    {
        if (file.mimetype === "application/pdf")
        {
            cb(null, true);
        } else
        {
            cb(new Error("Only PDF allowed"), false);
        }
    }
});


// ================= Time Table Upload =================

const timeTableStorage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, "uploads/timetable");
    },
    filename: (req, file, cb) =>
    {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const uploadTimeTable = multer({
    storage: timeTableStorage,
    limits: { fileSize: 3 * 1024 * 1024 },
    fileFilter: (req, file, cb) =>
    {
        if (file.mimetype === "application/pdf")
        {
            cb(null, true);
        } else
        {
            cb(new Error("Only PDF allowed"), false);
        }
    }
});


// ================= Thesis Upload =================

const thesisStorage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, "uploads/thesis");
    },
    filename: (req, file, cb) =>
    {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const uploadThesis = multer({
    storage: thesisStorage,
    limits: { fileSize: 3 * 1024 * 1024 },
    fileFilter: (req, file, cb) =>
    {
        if (file.mimetype === "application/pdf")
        {
            cb(null, true);
        } else
        {
            cb(new Error("Only PDF allowed"), false);
        }
    }
});