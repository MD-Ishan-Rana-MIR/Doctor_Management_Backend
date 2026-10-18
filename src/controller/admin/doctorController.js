const doctorModel = require("../../model/doctorModel");
const { getPagination, getPaginationResponse } = require("../../utility/pagination");

const createDoctor = async (req, res) => {
    try {
        const { name, specialization, hospital, phone, email } = req.body;
        const payload = {
            name, specialization, hospital, phone, email
        };

        const data = await doctorModel.create(payload);

        return res.status(201).json({
            status: "success",
            msg: "Doctor create successfully",
            data: data
        })

    } catch (error) {
        console.log(error)

    }
};


const getDoctors = async (req, res, next) => {
    try {
        const {
            q,
            specialization,
            hospital,
            startDate,
            endDate,
            page = "1",
            limit = "10",
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        // Pagination
        const pagination = getPagination(page, limit);

        if (pagination.error) {
            return res.status(400).json({
                success: false,
                message: pagination.error,
            });
        }

        const { currentPage, pageSize, skip } = pagination;

        // Sorting validation
        const allowedSortFields = [
            "name",
            "specialization",
            "hospital",
            "createdAt",
        ];

        if (
            !["asc", "desc"].includes(sortOrder) ||
            !allowedSortFields.includes(sortBy)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid sorting field or sort order.",
            });
        }

        // Search and filters
        const filter = {};

        // Search across name, specialization, hospital, email, and phone
        if (typeof q === "string" && q.trim()) {
            const escaped = q
                .trim()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            const regex = new RegExp(escaped, "i");

            filter.$or = [
                { name: regex },
                { specialization: regex },
                { hospital: regex },
                { email: regex },
                { phone: regex },
            ];
        }

        // Specialization filter
        if (typeof specialization === "string" && specialization.trim()) {
            const escaped = specialization
                .trim()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            filter.specialization = {
                $regex: escaped,
                $options: "i",
            };
        }

        // Hospital filter
        if (typeof hospital === "string" && hospital.trim()) {
            const escaped = hospital
                .trim()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            filter.hospital = {
                $regex: escaped,
                $options: "i",
            };
        }

        // Date filters
        if (startDate || endDate) {
            const dateFilter = {};

            if (startDate) {
                if (typeof startDate !== "string") {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid startDate.",
                    });
                }

                const start = new Date(startDate);

                if (Number.isNaN(start.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid startDate.",
                    });
                }

                dateFilter.$gte = start;
            }

            if (endDate) {
                if (typeof endDate !== "string") {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid endDate.",
                    });
                }

                const end = new Date(endDate);

                if (Number.isNaN(end.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid endDate.",
                    });
                }

                // Include the complete end date for YYYY-MM-DD input
                if (/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
                    end.setUTCHours(23, 59, 59, 999);
                }

                dateFilter.$lte = end;
            }

            if (
                dateFilter.$gte &&
                dateFilter.$lte &&
                dateFilter.$gte > dateFilter.$lte
            ) {
                return res.status(400).json({
                    success: false,
                    message: "startDate must not be after endDate.",
                });
            }

            filter.createdAt = dateFilter;
        }

        // Sorting
        const sort = {
            [sortBy]: sortOrder === "asc" ? 1 : -1,
        };

        // Fetch doctors and total count simultaneously
        const [doctors, total] = await Promise.all([
            doctorModel.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(pageSize)
                .lean(),

            doctorModel.countDocuments(filter),
        ]);

        return res.status(200).json({
            success: true,
            message: "Doctors retrieved successfully.",
            data: doctors,
            pagination: getPaginationResponse(
                total,
                currentPage,
                pageSize
            ),
        });
    } catch (error) {
        next(error);
    }
};









module.exports = { createDoctor , getDoctors}