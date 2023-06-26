const { SuperHero } = require("../models/superHero");
const { HttpError } = require("../helpers");

const {
  getAll,
  getById,
  add,
  removeById,
  updateById,
} = require("../controllers/superHeroes");

describe("getAll", () => {
  const mockRequest = () => {
    const req = {};
    req.query = {};
    return req;
  };

  const mockResponse = () => {
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
  };

  it("should return all super heroes", async () => {
    const superheroes = [
      { name: "Superman", power: "flight, super strength" },
      { name: "Batman", power: "intelligence, gadgets" },
    ];
    const count = superheroes.length;

    jest
      .spyOn(SuperHero, "find")
      .mockRejectedValueOnce(new Error("Database connection error"));
    jest.spyOn(SuperHero, "countDocuments").mockResolvedValueOnce(count);

    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    try {
      await getAll(req, res, next);
    } catch (error) {
      expect(error instanceof HttpError).toBe(true);
      expect(error.status).toBe(500);
      expect(error.message).toBe("Internal Server Error");
    }

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();

    SuperHero.find.mockRestore();
    SuperHero.countDocuments.mockRestore();
  });

  it("should return all super heroes", async () => {
    const superheroes = [
      { name: "Superman", power: "flight, super strength" },
      { name: "Batman", power: "intelligence, gadgets" },
    ];
    const count = superheroes.length;

    jest
      .spyOn(SuperHero, "find")
      .mockRejectedValueOnce(new Error("Database connection error"));
    jest.spyOn(SuperHero, "countDocuments").mockResolvedValueOnce(count);

    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    try {
      await getAll(req, res, next);
    } catch (error) {
      expect(error instanceof HttpError).toBe(true);
      expect(error.status).toBe(500);
      expect(error.message).toBe("Internal Server Error");
    }

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();

    SuperHero.find.mockRestore();
    SuperHero.countDocuments.mockRestore();
  });
});

describe("getById", () => {
  it("should return a super hero by ID", async () => {
    const superHero = { name: "Superman" };
    jest.spyOn(SuperHero, "findById").mockResolvedValueOnce(superHero);

    const req = {
      params: { id: "12345" },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await getById(req, res, next);

    expect(SuperHero.findById).toHaveBeenCalledWith("12345");
    expect(res.json).toHaveBeenCalledWith(superHero);
    expect(next).not.toHaveBeenCalled();
  });

  it("should throw HttpError with status 404 when super hero is not found", async () => {
    jest.spyOn(SuperHero, "findById").mockResolvedValueOnce(null);

    const req = {
      params: { id: "12345" },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    try {
      await getById(req, res, next);
    } catch (error) {
      expect(error instanceof HttpError).toBe(true);
      expect(error.status).toBe(404);
      expect(error.message).toBe("Not found");
    }

    expect(SuperHero.findById).toHaveBeenCalledWith("12345");
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new HttpError(404, "Not found"));
  });
});

describe("add", () => {
  it("should add a new super hero", async () => {
    const newSuperHero = { name: "Superman" };
    jest.spyOn(SuperHero, "create").mockResolvedValueOnce(newSuperHero);

    const req = {
      body: { name: "Superman" },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    await add(req, res, next);

    expect(SuperHero.create).toHaveBeenCalledWith({ name: "Superman" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newSuperHero);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("removeById", () => {
  it("should remove a super hero by ID", async () => {
    const removedSuperHero = { name: "Superman" };
    jest
      .spyOn(SuperHero, "findByIdAndRemove")
      .mockResolvedValueOnce(removedSuperHero);

    const req = {
      params: { id: "12345" },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await removeById(req, res, next);

    expect(SuperHero.findByIdAndRemove).toHaveBeenCalledWith("12345");
    expect(res.json).toHaveBeenCalledWith({ message: "Deleted" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should throw HttpError with status 400 when super hero is not found", async () => {
    jest.spyOn(SuperHero, "findByIdAndRemove").mockResolvedValueOnce(null);

    const req = {
      params: { id: "12345" },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    try {
      await removeById(req, res, next);
    } catch (error) {
      expect(error instanceof HttpError).toBe(true);
      expect(error.status).toBe(400);
      expect(error.message).toBe("Not found");
    }

    expect(SuperHero.findByIdAndRemove).toHaveBeenCalledWith("12345");
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new HttpError(400, "Not found"));
  });
});

describe("updateById", () => {
  it("should update a super hero by ID", async () => {
    const updatedSuperHero = { name: "Superman" };
    jest
      .spyOn(SuperHero, "findByIdAndUpdate")
      .mockResolvedValueOnce(updatedSuperHero);

    const req = {
      params: { id: "12345" },
      body: { name: "Superman" },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await updateById(req, res, next);

    expect(SuperHero.findByIdAndUpdate).toHaveBeenCalledWith(
      "12345",
      { name: "Superman" },
      { new: true }
    );
    expect(res.json).toHaveBeenCalledWith(updatedSuperHero);
    expect(next).not.toHaveBeenCalled();
  });

  it("should throw HttpError with status 404 when super hero is not found", async () => {
    jest.spyOn(SuperHero, "findByIdAndUpdate").mockResolvedValueOnce(null);

    const req = {
      params: { id: "12345" },
      body: { name: "Superman" },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    try {
      await updateById(req, res, next);
    } catch (error) {
      expect(error instanceof HttpError).toBe(true);
      expect(error.status).toBe(404);
      expect(error.message).toBe("Not found");
    }

    expect(SuperHero.findByIdAndUpdate).toHaveBeenCalledWith(
      "12345",
      { name: "Superman" },
      { new: true }
    );
    expect(res.json).not.toHaveBeenCalled();
  });
});
