import { NextFunction, Request, Response, Router } from 'express';
import { getWidgetRepository, Widget } from './model';

export const router: Router = Router();

router.get('/widget', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const repository = await getWidgetRepository();
        const allWidgets = await repository.find();
        res.send(allWidgets);
    }
    catch (err) {
        return next(err);
    }
});

router.get('/widget/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const repository = await getWidgetRepository();
        const widget = await repository.find({id: req.params.id});
        res.send(widget);
    }
    catch (err) {
        return next(err);
    }
});

router.post('/widget', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const repository = await getWidgetRepository();
        const widget = new Widget();
        widget.title = req.body.title;
        widget.description = req.body.description;
        widget.date = req.body.date;
        widget.price = Number.parseFloat(req.body.price);

        const result = await repository.save(widget);
        res.send(result);
    }
    catch (err) {
        return next(err);
    }
});

router.post('/widget/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const repository = await getWidgetRepository();
        const widget = await repository.findOne({id: req.params.id});
        widget.title = req.body.title;
        widget.description = req.body.description;
        widget.date = req.body.date;
        widget.price = Number.parseFloat(req.body.price);

        const result = await repository.save(widget);
        res.send(result);
    }
    catch (err) {
        return next(err);
    }
});

router.delete('/widget/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const repository = await getWidgetRepository();
        await repository.delete({id: req.params.id});
        res.send('OK');
    }
    catch (err) {
        return next(err);
    }
});
