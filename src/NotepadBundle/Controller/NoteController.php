<?php

namespace NotepadBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use NotepadBundle\Entity\Category;
use NotepadBundle\Entity\Note;

class NoteController extends Controller
{

    /**
     * @Route("/add-note", name="add-note")
     */
    function addNoteAction(Request $request) {
        $note = new Note();
        return $this->modifyNoteHelper($request, $note, 'Add a new note');
    }

    /**
     * @Route("/modify-note/{id}", name="modify-note")
     */
    function modifyNoteAction(Request $request, Note $note) {
        return $this->modifyNoteHelper($request, $note, 'Update note');
    }

    /**
     * @Route("/delete-note/{id}", name="delete-note")
     */
    function deleteNoteAction(Note $note) {
        if (!$note) {
            $this->addFlash('notice', 'Could not find this note!');
        }

        $em = $this->getDoctrine()->getEntityManager();
        $em->remove($note);
        $em->flush();

        return $this->redirect('/');
    }

    function modifyNoteHelper(Request $request, Note $note, $title) {
        $em = $this->getDoctrine()->getManager();

        $categories = $em->getRepository('NotepadBundle:Category')->findAll();
        if (!$categories) {
            $this->addFlash('notice', 'Error while fetching categories.');
        }

        $form = $this->createFormBuilder($note)
            ->add('title', TextType::class)
            ->add('content', TextareaType::class)
            ->add('category', ChoiceType::class,
                array('choices' => $categories,
                    'choice_label' => function($cat, $key, $index) {
                        return $cat->getName();
                    })
                )
            ->add('submit', SubmitType::class, array('label' => 'Save'))
            ->getForm();

        $form->handleRequest($request);
        $note = $form->getData();

        if ($form->isValid()) {
            $em->persist($note);
            $em->flush();
            return $this->redirect('/');
        }
        return $this->render('NotepadBundle:Default:note.html.twig',
            array('form' => $form->createView(), 'title' => $title));
    }
}
