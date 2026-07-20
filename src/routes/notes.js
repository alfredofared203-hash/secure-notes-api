router.get("/", notes.getNotes);

router.post("/", notes.addNote);

router.get("/search", notes.search);

router.get("/echo", notes.echo);

router.get("/calc", notes.calculate);

router.get("/run", notes.runCommand);